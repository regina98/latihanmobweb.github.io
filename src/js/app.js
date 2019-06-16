var button = document.querySelector('button');

navigator.serviceWorker.register('/latihanmobweb/sw.js');

function hitung(){
  var awal = document.getElementById('awal').selectedIndex;
  var akhir = document.getElementById('akhir').selectedIndex;
  var berat = document.getElementById('berat').value;
  var jenis = document.getElementById('jenis').selectedIndex;
  var jenis2;
  if (jenis == 0)
  { 
    jenis2 = 2;
  }
  else if (jenis == 1)
  {
    jenis2 = 1.5;
  }
  else if (jenis == 2)
  {
    jenis2 = 1;
  }
  var total =  Math.abs((awal+1) - (akhir+1)) * 10000 * jenis2 *berat;
  document.getElementById('hasil').innerHTML = total;
  localStorage.myProperty = total;
}
button.addEventListener('click', function() {
  hitung();
});
