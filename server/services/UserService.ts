export type UserType = {
  nickname: string;
  location1_id: number;
  location2_id?: number | null;
};

export const UserService = {
  createUser: async ({ nickname, location1_id }: UserType) => {
    // const result = await execQuery(CREATE_USER({ nickname, location1_id }));
    // return result;
  },

  updateUserLocation: async ({
    nickname,
    location1_id,
    location2_id,
  }: UserType) => {
    // await execQuery(
    //   UPDATE_USER_LOCATION({ nickname, location1_id, location2_id })
    // );
  },

  findUserByNickname: async ({ nickname }: { nickname: string }) => {
    // const result = await execQuery(FIND_BY_USER_NICKNAME({ nickname }));
    // return result;
  },

  findUserById: async ({ id }: { id: number }) => {
    // const result = await execQuery(FIND_BY_USER_ID({ id }));
    // return result;
  },
};
