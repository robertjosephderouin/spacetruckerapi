const jobsData = require('../../../jobsData');
const createJob = async (knex, job) => {
  const jobId = await knex('jobs').insert({
    image: job.image,
    name: job.name,
    date: job.date,
    pay: job.pay,
    isBooked: job.isBooked,
    fluff: job.fluff
  }, 'id');
};

exports.seed = async (knex) => {
  try {
    await knex('jobs').del()
    let jobPromises = jobsData.map(job => {
      return createJob(knex, job);
    });
    return Promise.all(jobPromises);
  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};
