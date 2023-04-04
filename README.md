# send FCM with gcloud

```
curl -X POST -H "X-Goog-User-Project: ideodora-blog2" -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json" -d '{
"message":{
   "notification":{
     "title":"FCM Message",
     "body":"This is an FCM Message"
   },
   "token":"thetoken"
}}' https://fcm.googleapis.com/v1/projects/ideodora-blog2/messages:send
```
