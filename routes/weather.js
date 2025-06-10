const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log("weather route called");
  try {
    const serviceKey = decodeURIComponent('iW2P8b4ORQGKVhT96osb7sewHiryyVLS%2F6Ljk4FTCehwkLLgCoCawCPoLeGef%2BOqo4mLbBC%2FmBBY%2BDt5bOEZDA%3D%3D');
    const baseDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const baseTime = '1700';
    const nx = '61'; 
    const ny = '127';

    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    const response = await axios.get(url, {
      params: {
        serviceKey,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx,
        ny,
      },
    });

    const items = response.data.response.body.items.item;
    res.json(items); 
  } catch (error) {
    console.error('날씨 정보 불러오기 실패:', error);
    res.status(500).json({ message: '날씨 정보 오류' });
  }
});

module.exports = router;
