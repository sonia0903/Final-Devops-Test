'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/child', async function (request, reply) {
    try {
      const mysql = fastify.mysql;
      const query = `SELECT * FROM nur_child`;
      const result = await mysql.query(query);
      console.log(result);
      reply.code(200).header('Content-type','application/json').send(result[0])
    } catch (error) {
      console.error(error);
      reply.code(400).send("목록 조회에 실패했습니다.")
    }
  })

  fastify.get('/enterwait', async function (req, reply) {
    const db = this.mongo.client.db('reqsysmgserver');
    const collection = db.collection('reqsysmg')
    const reqsysmg = await collection.find({}).toArray();
    reply.code(200).header('Content-type','application/json').send(reqsysmg)
  })

  fastify.get('/enterwait/:id', async function (req, reply) {
    // const db = this.mongo.client.db('reqsysmgserver');
    // const collection = db.collection('reqsysmg')
    // const reqsysmg = await collection.find({}).toArray();
    // reply.code(200).header('Content-type','application/json').send(reqsysmg)
    const nurRequestId = parseInt(req.params.id); // URL에서 nur_request_id를 추출
  
    try {
      const db = this.mongo.client.db('reqsysmgserver');
      const collection = db.collection('reqsysmg');
      const reqsysmg = await collection.findOne({ nur_request_id: nurRequestId });
      
      if (reqsysmg) {
        reply.code(200).header('Content-type', 'application/json').send(reqsysmg);
      } else {
        reply.code(404).send('Request not found');
      }
    } catch (error) {
      console.error(error);
      reply.code(500).send('Internal Server Error');
    }
  })

  fastify.post('/request', async function (req, reply) {
    try {
      const db = this.mongo.client.db('reqsysmgserver');
      const collection = db.collection('reqsysmg')
      const requestData = req.body;
      console.log(requestData)
      const result = await collection.insertOne(requestData);
      reply.code(201).send(result)
    } catch (error) {
      console.error(error);
      reply.code(500).send('Internal Server Error');
    }
  })
}
