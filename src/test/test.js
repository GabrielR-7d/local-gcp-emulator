const {PubSub} = require(`@google-cloud/pubsub`);
const { assert } = require('chai');

describe('Emulated pub/sub and cloud functions', function () {
  let topic;
  before(async function() {
    this.timeout(60000)
    const apiEndpoint = 'pubsub:8085';
    console.log(`Listening to the Pub/Sub emulator event at: ${apiEndpoint}`);
    const pubsub = new PubSub({
      apiEndpoint, // Pub/Sub emulator endpoint
      projectId: 'myproject',
    });
    topic = await pubsub.topic('my-topic');
    const [topicExists] = await topic.exists();
    if (!topicExists) {
      await topic.create();
    }
    await topic.createSubscription('my_subscription', {
      pushEndpoint: 'http://cloud-function:8080/projects/myproject/topics/my-topic',
    });
    console.log('subscription created');
  })

  it('should be able to process a message', async function() {
    console.log('Sending message');
      let response = await topic.publish(Buffer.from('Test message!'));
      assert.isNotNull(response);
  })
})