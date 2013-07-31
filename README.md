fover
=======

Functional State Machine Programing

## Testing

```javascript
var fover = new Fover();

fover
  .then(function () {
     console.log('empty on : 1');
 })
 .then(function () {
     console.log('empty on : 2');
 })
 .then(function () {
     console.log('empty on : 3');
 })
 .end();

fover
 .on('success && login', function () {
     console.log('login done');
     fover.status({
         isVip : true
     })
 })
 .then(function () {
     console.log('login : then1');
 })
 .on('success && isVip', function () {
     console.log('done : isVip');
 })
 .then(function () {
     console.log('isVip : then1');
 })
 .then(function () {
     console.log('isVip : then2');
 })

fover.status({
 success : true,
 login : true
})
```
