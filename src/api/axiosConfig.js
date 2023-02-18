import axios from 'axios';

export default axios.create(
    {
        baseURL:'http://team5adproject-env.eba-ccrqpkpw.ap-northeast-1.elasticbeanstalk.com',
        headers:{"ngrok-skip-browser-warning":"true"}
    }
)