import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.url) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(req.query.url as string);

      const metaImage = await page.evaluate(() => {
        const el = document.querySelector('meta[property="og:image"]');

        return (el as HTMLMetaElement | null)?.content;
      });

      if (metaImage) {
        res.status(200).json({ metaImage });
      } else {
        res.status(422).json({
          error: 'No meta image found.',
        });
      }

      await browser.close();
    } catch {
      res.status(400).end();
    }
  }

  res.status(400).end();
};
