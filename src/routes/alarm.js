import express from 'express';
import { homeRedirectIfAuth, authRequired } from 'lib/auth';
import Alarm from 'models/Alarm';
import XMLHttpRequest from 'xhr2';

const router = express.Router();

router.get('/alarm', authRequired, alarm);

function alarm(req, res) {
    Alarm.find(function(err, alarm) {
        res.render('alarm', {
            alarm: alarm[0]
        });
    });
}

router.get('/alarm/spotify', async function(req, res) {
    function getSpotifyDevices(token) {
        const url = 'https://api.spotify.com/v1/me/player/devices';

        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.onload = () => {
            if (xhr.status === 200) {
                const responseText = xhr.responseText;
                console.log(responseText)
            }
            if (xhr.status >= 400) {
                const responseText = xhr.responseText;
                console.log(responseText)
                console.log('Failed to get devices');
            }
        }

        xhr.send();
    }

    function getSpotifyCode() {
        const url = 'https://accounts.spotify.com/authorize';
        const body = `client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/alarm&scope=playlist-read-private%20user-modify-playback-state%20user-top-read%20user-read-recently-played%20user-read-currently-playing%20playlist-modify-private%20app-remote-control%20playlist-modify-public%20user-read-birthdate%20user-read-playback-state%20user-follow-read%20user-read-email%20streaming%20playlist-read-collaborative%20user-library-modify%20user-read-private%20user-follow-modify%20user-library-read&state=${process.env.SPOTIFY_STATE}`;

        const xhr = new XMLHttpRequest();

        xhr.open('POST', `${url}`);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = () => {
            if (xhr.status === 200) {
                const responseText = xhr.responseText;
                console.log(responseText)
            }
            if (xhr.status >= 400) {
                const responseText = xhr.responseText;
                console.log(responseText)
            }
        }

        xhr.send(body);
    }

    function playSpotify(token) {
        const url = 'https://api.spotify.com/v1/me/player/play';
        const data = {
            context_uri: 'spotify:user:zwiuxqdviqompi80y6ajitolr:playlist:4f9jOkDV5Pr3gNjFxyZCD8',
            offset: {
                position: 0
            },
            position_ms: 0,
        };

        const xhr = new XMLHttpRequest();

        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.onload = () => {
            if (xhr.status <= 205) {
                const responseText = xhr.responseText;
                console.log(responseText, 'Success Play')
                spotifySuccess();
            }
            if (xhr.status >= 400) {
                const responseText = JSON.parse(xhr.responseText);
                console.log(responseText, 'Fail Play')

                if (xhr.status == 401) {
                    console.log(responseText, 'Fail Play, Renew Token')
                    renewSpotifyToken();
                }

                if (xhr.status == 404) {
                    console.log(responseText, 'Fail Play, No device active')
                    spotifyError(responseText);
                }
            }
        }

        xhr.send(JSON.stringify(data));
    }

    function pauseSpotify(token) {
        const url = 'https://api.spotify.com/v1/me/player/pause';

        const xhr = new XMLHttpRequest();

        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.onload = () => {
            if (xhr.status <= 205) {
                const responseText = xhr.responseText;
                console.log(responseText, 'Success Pause');
                spotifySuccess();
            }
            if (xhr.status >= 400) {
                const responseText = JSON.parse(xhr.responseText);
                console.log(responseText, 'Fail Pause');

                if (xhr.status == 401) {
                    console.log(responseText, 'Fail Pause, Renew Token');
                    renewSpotifyToken();
                }

                if (xhr.status == 404) {
                    console.log(responseText.error.message, 'Fail Pause, No device active');
                    spotifyError(responseText);
                }
            }
        }

        xhr.send();
    }

    function renewSpotifyToken() {
        const url = 'https://accounts.spotify.com/api/token';
        // To get refresh_token
        // const body = `grant_type=authorization_code&code=${process.env.REFRESH_TOKEN}&redirect_uri=http://localhost:3000/alarm&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_SECRET_ID}`
        const body = `grant_type=refresh_token&refresh_token=${process.env.REFRESH_TOKEN}&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_SECRET_ID}`
        const xhr = new XMLHttpRequest();

        xhr.open('POST', `${url}`);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = async () => {
            if (xhr.status === 200) {
                const responseText = xhr.responseText;
                const tokenObj = JSON.parse(responseText);
                const { access_token } = tokenObj;
                const alarm = await Alarm.findById('5c18fea9250cf823aeaefb82');
                const updateAlarmToken = await alarm.updateOne({spotify_token: access_token});

                getSpotifyToken();
            }
            if (xhr.status >= 400) {
                const responseText = xhr.responseText;
                console.log(responseText)
            }
        }

        xhr.send(body);
    }

    async function getSpotifyToken() {
        const alarm = await Alarm.findById('5c18fea9250cf823aeaefb82');
        const { spotify_token } = await alarm;

        alarm.state ? playSpotify(spotify_token) : pauseSpotify(spotify_token);
    };

    (async function initSpotify() {
        await getSpotifyToken();
    })();

    function spotifyError(error) {
        res.status(500).json(error);
    }

    function spotifySuccess() {
        res.end();
    }
});

router.put('/alarms/:id', async function(req, res) {
    const alarm = await Alarm.findById(req.body.id);
    const updateState = await alarm.updateOne(req.body);

    res.send('State updated')
});

export default router;