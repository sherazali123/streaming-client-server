#!/bin/sh
echo 'Testing started ..'
echo 'Hold on for one or two minutes'
node ./receiver/index > received_event_stream.log & RECEIVER_PID=$!
cat sample_event_stream.log | node ./sender/index
kill -15 $RECEIVER_PID
sort sample_event_stream.log > sample_event_stream.log.sort
sort received_event_stream.log  > received_event_stream.log.sort
DIFF=$(diff received_event_stream.log.sort sample_event_stream.log.sort)

if [ -z "$DIFF" ];
  then
  echo 'Well done. All events are successfully transferred.'
  else
  echo 'Failed, the received event dump does not match the sample input!'
fi
