
import { httpaddNewlaunch, HttpgetAllLaunches , httpAbortLaunch } from './launches.controller.js'
import express from 'express'
const launchRouter=express.Router()
launchRouter.get('/',HttpgetAllLaunches)
launchRouter.post('/',httpaddNewlaunch)
launchRouter.delete('/:id',httpAbortLaunch)
export {launchRouter}