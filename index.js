import Redis from "ioredis";

const redis = new Redis("redis://:mysecretpassword@localhost:6379");
const psn = "3333333333";
(async () => {
//   await redis.set("taxperson:2701850401",JSON.stringify({"foo":"bar"}));
  await redis.set("taxperson:3333333333",JSON.stringify({"foo":"test Bar"}));

  const taxperson = await redis.get(`taxperson:${psn}`)
  console.log('The value of taxPerson is: ',JSON.parse(taxperson))
})();