import { NextApiRequest, NextApiResponse } from 'next';

import { PixsyData, Topic } from '@/interfaces/PixsyData';
import { getData } from '@/services/getData';

export default async function images(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getData('https://static.pixsy.io/sample/photos.json');
  const imageData: PixsyData[] = data['photos'];
  console.log(typeof data);

  if (req.method === 'GET') {
    const topics: Topic = {};
    const cursor = req.query.cursor as string;
    const topic = (req.query.topic as string) || '';
    const search = (req.query.search as string) || '';
    console.log('cursor', cursor);
    console.log('topic', topic);
    console.log('search', search);

    let start = 0;
    const limit = 10;
    // Todo: topic gleich all
    let filteredData = imageData.filter((data) => data.topics.includes(topic));
    if (search)
      filteredData = filteredData.filter(
        (data) =>
          data.description?.toLowerCase().includes(search) || data.user?.toLowerCase().includes(search.toLowerCase())
      );
    const index = filteredData.findIndex((item) => item.id === cursor);
    console.log('index', index);

    if (index !== -1) start = index + 1;
    const slicedImageData = filteredData.slice(start, start + limit);
    return res.status(200).json({
      imageData: slicedImageData,
      nextId:
        slicedImageData.length === limit
          ? slicedImageData[limit - 1].id
          : undefined,
    });
  }
}
