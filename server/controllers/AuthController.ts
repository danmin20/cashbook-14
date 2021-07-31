import { Request, Response, NextFunction, query } from 'express';
import { CategoryService } from '../services/CategoryService';
import { PaymentService } from '../services/PaymentService';
import { UserService } from '../services/UserService';
import { User } from '../models/user';
import rs from 'randomstring';
import QueryString from 'qs';
import fetch from 'node-fetch';

function githubLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const state = rs.generate();

    const url = 'https://github.com/login/oauth/authorize?';
    const query = QueryString.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: 'http://localhost:3000/api/auth/callback',
      state: state,
      scope: 'user:email',
    });
    res.redirect(url + query);
  } catch (err) {
    next(err);
  }
}

// 로그인 또는 회원가입
async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { code } = req.query;
    const access_token = await getAccessToken(code as string);
    const userData = await getGithubUser(access_token);

    const isExist = (await UserService.findUser({
      githubId: userData.login,
    })) as User;

    // 없으면 유저 생성
    if (!isExist) {
      await UserService.createUser({
        githubId: userData.login,
        githubName: userData.name,
      });

      const { id: userId } = (await UserService.findUser({
        githubId: userData.login,
      })) as User;

      // 기본 카테고리/결제수단 생성
      for (const { name, type, color } of defaultCategories) {
        await CategoryService.createCategory({ userId, name, type, color });
      }
      for (const { name, type } of defaultPayments) {
        await PaymentService.createPayment({ userId, name, type });
      }
    }

    const { id: userId } = (await UserService.findUser({
      githubId: userData.login,
    })) as User;

    req.session.user = {
      userId,
      githubId: userData.login,
      githubName: userData.name,
    };

    res.redirect('http://localhost:8080');
  } catch (err) {
    res.redirect('http://localhost:8080/error');
  }
}

async function getAccessToken(code: string): Promise<string> {
  const tokenURL = 'https://github.com/login/oauth/access_token';
  const accessTokenResponse = await fetch(tokenURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRETS,
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
  return userApiJson;
}

export const AuthController = {
  login,
  githubLogin,
  getGithubUser,
};

const defaultPayments = [
  {
    name: '현금',
    type: 'income',
  },
  {
    name: '현대카드',
    type: 'outcome',
  },
  {
    name: '신한카드',
    type: 'outcome',
  },
];

const defaultCategories = [
  {
    name: '생활',
    type: 'outcome',
    color: '#4a6cc3',
  },
  {
    name: '식비',
    type: 'outcome',
    color: '#4ca1de',
  },
  {
    name: '교통',
    type: 'outcome',
    color: '#94d3cc',
  },
  {
    name: '쇼핑/뷰티',
    type: 'outcome',
    color: '#4cb8b8',
  },
  {
    name: '의료/건강',
    type: 'outcome',
    color: '#6ed5eb',
  },
  {
    name: '문화/여가',
    type: 'outcome',
    color: '#d092e2',
  },
  {
    name: '기타',
    type: 'outcome',
    color: '#817dce',
  },
  {
    name: '월급',
    type: 'income',
    color: '#b9d58c',
  },
  {
    name: '용돈',
    type: 'income',
    color: '#e6d267',
  },
  {
    name: '기타수입',
    type: 'income',
    color: '#e2b765',
  },
];
