import { Request, Response, NextFunction, query } from 'express';
import { CategoryService } from '../services/CategoryService';
import { PaymentService } from '../services/PaymentService';
import { UserService } from '../services/UserService';
import { User } from '../models/user';
import rs from 'randomstring';
import QueryString from 'qs';
import fetch from 'node-fetch';
import { env } from '../envConfig';
import { HistoryService } from '../services/HistoryService';

function githubLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const state = rs.generate();

    const url = 'https://github.com/login/oauth/authorize?';
    const query = QueryString.stringify({
      client_id: env?.GITHUB_CLIENT_ID,
      redirect_uri: `${env?.SERVER_URL}/api/auth/callback`,
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

    // githubName이 없는 경우 githubId를 복사하여 사용
    userData.name = userData.name ?? userData.login;

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
      // 지출 더미데이터
      for (const data of outcomeHistories) {
        const payments = await PaymentService.findPayments({ userId });
        const categories = await CategoryService.findCategories({
          userId,
          type: 'outcome',
        });
        await HistoryService.createHistory({
          ...data,
          userId,
          paymentId: payments[1].id,
          categoryId: categories[0].id,
        });
      }
      for (const data of outcomeHistories2) {
        const payments = await PaymentService.findPayments({ userId });
        const categories = await CategoryService.findCategories({
          userId,
          type: 'outcome',
        });
        await HistoryService.createHistory({
          ...data,
          userId,
          paymentId: payments[2].id,
          categoryId: categories[1].id,
        });
      }
      // 수입 더미데이터
      for (const data of incomeHistories) {
        const payments = await PaymentService.findPayments({ userId });
        const categories = await CategoryService.findCategories({
          userId,
          type: 'income',
        });
        await HistoryService.createHistory({
          ...data,
          userId,
          paymentId: payments[0].id,
          categoryId: categories[0].id,
        });
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

    res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'http://3.36.99.206:3000'
        : 'http://localhost:8080'
    );
  } catch (err) {
    res.redirect(
      process.env.NODE_ENV === 'production'
        ? 'http://3.36.99.206:3000/error'
        : 'http://localhost:8080/error'
    );
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
      client_id: env?.GITHUB_CLIENT_ID,
      client_secret: env?.GITHUB_CLIENT_SECRETS,
      code: code as string,
      redirect_uri: env?.SERVER_URL,
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

// 생활
const outcomeHistories = [
  {
    content: '요가복',
    amount: 63000,
    type: 'outcome',
    date: '2021-08-06',
  },
  {
    content: '홈트레이닝용 철봉',
    amount: 109000,
    type: 'outcome',
    date: '2021-08-05',
  },
  {
    content: '일렉기타',
    amount: 390000,
    type: 'outcome',
    date: '2021-08-03',
  },
  {
    content: '노래방 기계',
    amount: 230000,
    type: 'outcome',
    date: '2021-08-02',
  },
  {
    content: '방음부스',
    amount: 500000,
    type: 'outcome',
    date: '2021-08-01',
  },
  {
    content: '커피머신',
    amount: 830000,
    type: 'outcome',
    date: '2021-07-06',
  },
  {
    content: '다이슨 청소기',
    amount: 900000,
    type: 'outcome',
    date: '2021-06-18',
  },
  {
    content: '캣타워',
    amount: 300000,
    type: 'outcome',
    date: '2021-05-10',
  },
  {
    content: '식기세척기',
    amount: 970000,
    type: 'outcome',
    date: '2021-04-20',
  },
];

// 식비
const outcomeHistories2 = [
  {
    content: '맛나 스시',
    amount: 120000,
    type: 'outcome',
    date: '2021-08-06',
  },
  {
    content: '물회',
    amount: 39000,
    type: 'outcome',
    date: '2021-08-05',
  },
  {
    content: '철판 큐브스테이크',
    amount: 43000,
    type: 'outcome',
    date: '2021-08-04',
  },
  {
    content: '토마토 홍합 나베',
    amount: 90000,
    type: 'outcome',
    date: '2021-07-20',
  },
  {
    content: '눈꽃 삼겹살',
    amount: 20000,
    type: 'outcome',
    date: '2021-06-20',
  },
  {
    content: '북구청 막창',
    amount: 30000,
    type: 'outcome',
    date: '2021-05-20',
  },
  {
    content: '백숙',
    amount: 73000,
    type: 'outcome',
    date: '2021-04-20',
  },
];

// 월급
const incomeHistories = [
  {
    content: '우아한테크캠프 월급',
    amount: 100000,
    type: 'income',
    date: '2021-08-05',
  },
  {
    content: '도서관 근로장학금',
    amount: 320000,
    type: 'income',
    date: '2021-08-02',
  },
  {
    content: '외주 프로젝트 정산',
    amount: 900000,
    type: 'income',
    date: '2021-07-14',
  },
  {
    content: '이모티콘 판매 수익',
    amount: 780000,
    type: 'income',
    date: '2021-07-01',
  },
  {
    content: '교내 멘토링 급여',
    amount: 800000,
    type: 'income',
    date: '2021-06-24',
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
    name: '미분류',
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
