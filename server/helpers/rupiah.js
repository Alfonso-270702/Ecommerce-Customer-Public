function convertRupiah(price){
    let reverse = price.toString().split('').reverse().join('')
	let ribuan 	= reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan
}

module.exports = convertRupiah