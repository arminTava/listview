import { NextApiRequest, NextApiResponse } from 'next';

import { PixsyData } from '@/interfaces/PixsyData';
import { getMainData } from '@/services/getData';

export default async function images(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const imageData: PixsyData[] = await getMainData()

  if (req.method === 'GET') {
    const cursor = req.query.cursor as string;
    const topic = (req.query.topic as string) || '';
    const search = (req.query.search as string) || '';

    let start = 0;
    const limit = 10;
    let filteredData = topic==="all" ? imageData : imageData.filter((data) => data.topics.includes(topic));
    if (search)
      filteredData = filteredData.filter(
        (data) =>
          data.description?.toLowerCase().includes(search) || data.user?.toLowerCase().includes(search.toLowerCase())
      );
    const index = filteredData.findIndex((item) => item.id === cursor);
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
