import { Server } from 'socket.io'
import { $log as logger } from '@tsed/logger'

logger.level = 'debug'
logger.name = 'SOCKETS'

const io = new Server({})

io.on('connection', (socket) => {
	logger.info('successfull connection')
})

io.listen(process.env.PORT | 12245)
