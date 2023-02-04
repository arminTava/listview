import { NextApiRequest, NextApiResponse } from 'next';

import { PixsyData, Topic } from '@/interfaces/PixsyData';
import { getData } from '@/services/getData';

export default async function pixsyTopics(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getData('https://static.pixsy.io/sample/photos.json');
  const imageData: PixsyData[] = data['photos'];
  console.log(typeof data);
  if (req.method === 'GET') {
    let topics: Topic = {};
    const search = req.query.search as string;;
    imageData.forEach((item) => {
      item.topics.forEach((topic) => {
        if (topic in topics) {
          topics[topic] = { ...topics[topic], count: topics[topic].count + 1 };
        } else {
          topics[topic] = { links: [item.url], count: 1 };
        }
      });
    });
    if (search) {
      topics = Object.keys(topics)
        .filter((key) => key.includes(search))
        .reduce((cur, key) => {
          return Object.assign(cur, { [key]: topics[key] });
        }, {});
    }
    return res.status(200).json(topics);
  }
}
