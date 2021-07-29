import express, { Request, Response } from 'express';
import rs from 'randomstring';
import qs from 'querystring';
import fetch from 'node-fetch';
import jwt, { Secret } from 'jsonwebtoken';

// import { githubAccessToken, githubUser } from '../../DTO/githubLogin';

const GITHUB_CLIENT_ID = 'd0c1439770278d8073c1';
const GITHUB_CLIENT_SECRETS = '18580c89854b783ae43c24ae513b38917e85c6ed';

const githubLoginRouter = express.Router();

let state;

githubLoginRouter.get('/', (req: Request, res: Response, next) => {
  state = rs.generate();

  const url = 'https://github.com/login/oauth/authorize?';
  const query = qs.stringify({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/api/githublogin/callback',
    state: state,
    scope: 'user:email',
  });

  const githubAuthUrl = url + query;
  res.redirect(githubAuthUrl);
});

githubLoginRouter.get('/callback', async (req: any, res: Response, next) => {
  try {
    const { code } = req.query;
    const access_token = await getAccessToken(code as string);
    // const userData = await getGithubUser(access_token);

    // jwt.sign({ id: userData.id }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    //       expiresIn: '1000h',
    //     });
    req.session.token = access_token;
    // req.session.githubId = userData.id;
    // req.session.username = userData.login;
    // const token = jwt.sign({ ...userData }, 'asdfasdfas', {
    //   expiresIn: '1000h',
    // });
    // res.send({ access_token });
    res.redirect('http://localhost:8080/');
  } catch (err) {
    console.log(err);
    res.redirect('http://localhost:8080/error');
  }
});

async function getAccessToken(code: string): Promise<string> {
  const tokenURL = 'https://github.com/login/oauth/access_token';
  const accessTokenResponse = await fetch(tokenURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRETS,
      code: code as string,
      redirect_uri: 'http://localhost:3000/',
    }),
  });
  const accessTokenJson = await accessTokenResponse.json();
  return accessTokenJson.access_token;
}

async function getGithubUser(access_token: string) {
  const userApiResponse = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${access_token}`,
    },
  });
  const userApiJson = await userApiResponse.json();
  console.log('userApiJson', userApiJson);
  return userApiJson;
}

export default githubLoginRouter;
