import Redis from "ioredis";

const redis = new Redis({
    host:"127.0.0.1",
    port:6379,
    retryStrategy(times){
        return Math.min(times * 20, 2000)
    }
})

redis.on("connect",()=>console.log("redis connected"));
redis.on("error",(err)=> console.log("Error in connecting Redis",err));

export default redis;