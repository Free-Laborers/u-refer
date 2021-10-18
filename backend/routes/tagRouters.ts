import express, { NextFunction, Request, Response } from 'express'
const tagRouter = express.Router()

import * as tagRouters from '../controllers/tagControllers'

tagRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await tagRouters.getTags()
    res.status(200).json({ tags })
  } catch (e: any) {
    next(new Error(e))
  }
})

export { tagRouter }
