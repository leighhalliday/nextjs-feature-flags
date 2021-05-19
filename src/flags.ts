import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export const enableFlag = async (key: string) => {
  // await redis.sadd("flags", key);
  // await redis.set(`flag:${key}`, "1");
  await redis.multi().sadd("flags", key).set(`flag:${key}`, "1").exec();
};

export const disableFlag = async (key: string) => {
  await redis.set(`flag:${key}`, "0");
};

export const removeFlag = async (key: string) => {
  await redis.srem("flags", key);
  await redis.del(`flag:${key}`);
};

const getKeys = async () => {
  return redis.smembers("flags");
};

export const checkOne = async (key: string) => {
  const value = await redis.get(`flag:${key}`);
  return value === "1";
};

export const checkAll = async () => {
  const keys = await getKeys();
  return checkMulti(keys);
};

export const checkMulti = async (keys: string[]) => {
  if (keys.length === 0) return {};

  const values = await redis.mget(keys.map((key) => `flag:${key}`));

  const mapped = keys.reduce((acc, key, index) => {
    acc.set(key, values[index] === "1");
    return acc;
  }, new Map<string, boolean>());

  return Object.fromEntries(mapped);
};
