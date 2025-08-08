console.log('babel/register start');
require('@babel/register')({
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    ignore: [],
});
console.log('babel/register end');

