$(document).ready(function(){
 fence_prof($('#form1'))
 fence_netting($('#form2'))
 fence_wood($('#form3'))
 fence_shtak($('#form4'))
})
//Забор из профнастила
function fence_prof(form){
 form.find('[data-name]').each(function(){$(this).bind('change, keyup',function(){recalc()})})
 function recalc(){
  var length=form.find('[data-name="length"]').val().replace(/[^\d]/gi,'')/1;
  var afterMkad = form.find('[data-name="afterMkad"]').val().replace(/[^\d]/gi,'')/1;
  //Обновляем инпут до числового значения
  if (form.find('[data-name="length"]').val() != length) form.find('[data-name="length"]').val(length)
  if (form.find('[data-name="afterMkad"]').val() != afterMkad) form.find('[data-name="afterMkad"]').val(afterMkad)
  
  var height=form.find('[data-name="height"] option:selected').val()/1;
  var cover=form.find('[data-name="cover"] option:selected').val()/1;
  var lag=form.find('[data-name="lag"] option:selected').val()/1;
  var gate=form.find('[data-name="gate"] option:selected').val()/1;
  var gateWidth=form.find('[data-name="gateWidth"] option:selected').val()/1;
  var wicket=form.find('[data-name="wicket"] option:selected').val()/1;
  var generator=1;
  var pillar = 0;
  var pillarHeight = 1;
  //Проверяем генератор
  if (form.find('[data-name="generator"]').is(":not(:checked)")) generator = 0;
  
  var itogMat = 0;var itogWork = 0;var itogAll = 0;
  
  //Первая строка таблицы
  var tr10 = form.find('[data-td="tr10"]');
  switch (height){
   case 200:tr10.text("Столб проф.труба 60 x 60 мм. h=3000 мм.");break;
   case 180:tr10.text("Столб проф.труба 60 x 60 мм. h=2700 мм.");break;
   case 170:tr10.text("Столб проф.труба 60 x 60 мм. h=2500 мм.");break;
   case 150:tr10.text("Столб проф.труба 60 x 60 мм. h=2500 мм.");break;
  }
  //Количество столбов
  if (gate == 0 && wicket <=1) pillar = 1;
  form.find('[data-td="tr11"]').text(Math.floor((length-wicket-(gate*gateWidth/1000))/(25/10)+ pillar));
  //Цена
  var tr13 = form.find('[data-td="tr13"]');
  switch (height){
   case 150:case 170:tr13.text(450);break;
   case 180:tr13.text(486);break;
   case 200:tr13.text(540);break;
  }
  //Сумма
  form.find('[data-td="tr14"]').text(tr13.text()*form.find('[data-td="tr11"]').text());

  //Вторая строка таблицы
  switch (lag){
   case 2:form.find('[data-td="tr20"]').text("Лаги проф. труба 40 x 20 мм. (в два ряда)");break;
   case 3:form.find('[data-td="tr20"]').text("Лаги проф. труба 40 x 20 мм. (в три ряда)");break;
  }
  //Количество п.метров
  form.find('[data-td="tr21"]').text(Math.floor((~~length-wicket-(gate*gateWidth/1000))*lag+lag));
  form.find('[data-td="tr23"]').text(66);
  //Сумма
  form.find('[data-td="tr24"]').text(form.find('[data-td="tr21"]').text()*form.find('[data-td="tr23"]').text())
  
  //Третья строка таблицы
  // Количество погонных метров
  switch (height){
   case 150:case 170:pillarHeight = 2.5;break;
   case 180:pillarHeight = 2.7;break;
   case 200:pillarHeight = 3;break;
  }
  form.find('[data-td="tr33"]').text(13)
  form.find('[data-td="tr31"]').text(Math.floor(~~form.find('[data-td="tr21"]').text() + (~~form.find('[data-td="tr11"]').text() * pillarHeight) + (40 * gate) + (20 * wicket) + 1));
 //Сумма
  form.find('[data-td="tr34"]').text(form.find('[data-td="tr31"]').text()*form.find('[data-td="tr33"]').text())
  
  //Четвёртая строка таблицы
  var tr40 = "";
  switch (height){
   case 200:switch (cover){
    case 1:tr40 = "Профлист цветной h=2000 мм.";break;
    case 2:tr40 = "Профлист двухсторонний h=2000 мм.";break;
    case 3:tr40 = "Профлист оцинкованный h=2000 мм.";break;
   } break;
   case 180:switch (cover){ 
    case 1:tr40 = "Профлист цветной h=1800 мм.";break;
    case 2:tr40 = "Профлист двухсторонний h=1800 мм.";break;
    case 3:tr40 = "Профлист оцинкованный h=1800 мм.";break;
   }break;
   case 170:switch (cover){
    case 1:tr40 = "Профлист цветной h=1700 мм.";break;
    case 2:tr40 = "Профлист двухсторонний h=1700 мм.";break;
    case 3:tr40 = "Профлист оцинкованный h=1700 мм.";break;
   }break;
   case 150:switch (cover){
    case 1:tr40 = "Профлист цветной h=1500 мм.";break;
    case 2:tr40 = "Профлист двухсторонний h=1500 мм.";break;
    case 3:tr40 = "Профлист оцинкованный h=1500 мм.";break;
   }break;
  }
  form.find('[data-td="tr40"]').text(tr40);
  //Количество кв. метров профлиста
  form.find('[data-td="tr41"]').text(Math.floor((length*height/100) + (gate*2)));
  // Цена
  switch (cover){
   case 1: form.find('[data-td="tr43"]').text(230);break;
   case 2: form.find('[data-td="tr43"]').text(295);break;
   case 3: form.find('[data-td="tr43"]').text(210);break;
  }
  //Сумма
  form.find('[data-td="tr44"]').text(form.find('[data-td="tr43"]').text()*form.find('[data-td="tr41"]').text())
  
  //Пятая строка таблицы
  //Количество
  if (length < 65) form.find('[data-td="tr51"]').text(1)
   else if(length < 115) form.find('[data-td="tr51"]').text(2)
    else form.find('[data-td="tr51"]').text(3)
  form.find("[data-td='tr53']").text(0)
  // Сумма
  form.find('[data-td="tr54"]').text(0*form.find('[data-td="tr51"]').text())
  
  //Шестая строка таблицы
  switch (gateWidth){
   case 4000: form.find('[data-td="tr60"]').text("Ворота распашные, шириной 4 м.");break;
   case 3500: form.find('[data-td="tr60"]').text("Ворота распашные, шириной 3,5 м.");break;
   case 3000: form.find('[data-td="tr60"]').text("Ворота распашные, шириной 3 м.");break;
  }
  
  //Количество ворот
  form.find('[data-td="tr61"]').text(gate);
  
  //Цена
  var tr63 = "";
  switch (gateWidth){
	case 3000:switch (height){
	 case 150:tr63 = 4170;break;
	 case 170:tr63 = 4320;break;
	 case 180:tr63 = 4395;break;
	 case 200:tr63 = 4545;break;
	}break;
	case 3500:switch (height){
	 case 150:tr63 = 4300;break;
	 case 170:tr63 = 4450;break;
	 case 180:tr63 = 4525;break;
	 case 200:tr63 = 4680;break;
	}break;
	case 4000:switch (height){
	 case 150:tr63 = 4430;break;
	 case 170:tr63 = 4580;break;
	 case 180:tr63 = 4660;break;
	 case 200:tr63 = 4800;break;
	}break;
  }
  form.find('[data-td="tr63"]').text(tr63);
  //Сумма
  form.find('[data-td="tr64"]').text(form.find('[data-td="tr63"]').text()*form.find('[data-td="tr61"]').text())
  
  //Седьмая строка таблицы
  //Количество калиток
  form.find('[data-td="tr71"]').text(wicket);	
  //Цена
  switch (height){
   case 150:form.find('[data-td="tr73"]').text(2580);break;
   case 170:form.find('[data-td="tr73"]').text(2700);break;
   case 180:form.find('[data-td="tr73"]').text(2770);break;
   case 200:form.find('[data-td="tr73"]').text(2890);break;
  }
  //Сумма
  form.find('[data-td="tr74"]').text(form.find('[data-td="tr73"]').text()*form.find('[data-td="tr71"]').text())
  
  //Восьмая строка таблицы
  //Количество метров
  form.find('[data-td="tr81"]').text(length);
  //Цена 
  switch(lag){
   case 2:form.find('[data-td="tr83"]').text(240);break;
   case 3:form.find('[data-td="tr83"]').text(260);break;
  }
  //Сумма
  form.find('[data-td="tr84"]').text(form.find('[data-td="tr83"]').text()*form.find('[data-td="tr81"]').text())
  
  //Девятая строка таблицы
  //Количество ворот
  form.find('[data-td="tr91"]').text(gate);
  form.find('[data-td="tr93"]').text(1800);
  // Сумма
  form.find('[data-td="tr94"]').text(form.find('[data-td="tr93"]').text()*form.find('[data-td="tr91"]').text())
  //Десятая строка таблицы
  // Количество
  form.find('[data-td="trA1"]').text(wicket);
  form.find('[data-td="trA3"]').text(1200);
  //Сумма
  form.find('[data-td="trA4"]').text(form.find('[data-td="trA3"]').text()*form.find('[data-td="trA1"]').text())
  
  //Одиннадцатая строка таблицы	
  // Количество
  if (generator){
	if (length < 55) form.find('[data-td="trB1"]').text(1);
	  else form.find('[data-td="trB1"]').text(2);
  } else form.find('[data-td="trB1"]').text(0);
  form.find('[data-td="trB3"]').text(500);
  form.find('[data-td="trB4"]').text(form.find('[data-td="trB3"]').text()*form.find('[data-td="trB1"]').text())
 
  //Двенадцатая строка таблицы
  //Количество
  form.find('[data-td="trC1"]').text(afterMkad);
  //Цена
  form.find('[data-td="trC3"]').text(28);
  //Сумма
  form.find('[data-td="trC4"]').text(form.find('[data-td="trC3"]').text()*form.find('[data-td="trC1"]').text())
  
  //ИТОГО ПО МАТЕРИАЛАМ
  itogMat = ~~form.find('[data-td="tr14"]').text() + ~~form.find('[data-td="tr24"]').text() + ~~form.find('[data-td="tr34"]').text() + ~~form.find('[data-td="tr44"]').text() + ~~form.find('[data-td="tr54"]').text() + ~~form.find('[data-td="tr64"]').text() + ~~form.find('[data-td="tr74"]').text();
  form.find('[data-name="itogMat"]').val(itogMat);
  //ЗА РАБОТУ
  itogWork = ~~form.find('[data-td="tr84"]').text() + ~~form.find('[data-td="tr94"]').text() + ~~form.find('[data-td="trA4"]').text();
  form.find('[data-name="itogWork"]').val(itogWork);
  //ИТОГО ЗА ВСЕ
  worlAll = ~~itogMat+~~itogWork+~~form.find('[data-td="trB4"]').text()+~~form.find('[data-td="trC4"]').text();
  form.find('[data-name="itogAll"]').val(worlAll);
 }
}

//Забор из рабицы
function fence_netting(form){
 form.find('[data-name]').each(function(){$(this).bind('change, keyup',function(){recalc()})})
 function recalc(){
  var bpz = {"h1":0,150:270,180:305,200:375,170:295}//[Базовая стоимость забора] adminka tablica
  var height=form.find('[data-name="height"] option:selected').val()/1;
  var gate=form.find('[data-name="gate"] option:selected').val()/1;
  var wicket=form.find('[data-name="wicket"] option:selected').val()/1;
  var fittings=form.find('[data-name="fittings"] option:selected').val()/1;
  var length=form.find('[data-name="length"]').val().replace(/[^\d]/gi,'')/1;
  var afterMkad=form.find('[data-name="afterMkad"]').val().replace(/[^\d]/gi,'')/1;
  //Обновляем инпут до числового значения
  if (form.find('[data-name="length"]').val() != length) form.find('[data-name="length"]').val(length)
  if (form.find('[data-name="afterMkad"]').val() != afterMkad) form.find('[data-name="afterMkad"]').val(afterMkad)
  
  //Константы
  var bsv = 2500 //Базовая стоимость ворот
  var bsk = 1500 //Базовая стоимость калитки
  var gateKoef = 1.5 //Коэффицент на ворота
  var wicketKoef = 1.6 //Коэффицент на калитку
  var demontag = 0 //Базовая стоимость демонтажа старого забора
  var mkadKoef = 28 //Базовая стоимость доставки на 1км за МКАД
  
  var bsdpa = function(){
   if(length*1 == 0){
	return [0,0];
   };
   if (length <= 20){
    switch (height){
     case 150:return [13000,0];break;
     case 170:return [14000,0];break;
     case 180:return [14000,0];break;
     case 200:return [15000,0];break;
	 default:return [0,0];
    }
   } else if(length <= 60){
    length -=20;
    switch (height){
     case 150:return [13000,200];break;
     case 170:return [14000,200];break;
     case 180:return [14000,210];break;
     case 200:return [15000,280];break;
	 default:return [0,0];
    }
   }else if(length <= 250){
    length -=60;
    switch (height){
     case 150:return [21000,230];break;
     case 170:return [22000,270];break;
     case 180:return [22400,270];break;
     case 200:return [26200,360];break;
	 default:return [0,0];
    }
   }else if(length <= 1000){
    length -=250;
    switch (height){
     case 150:return [64700,260];break;
     case 170:return [73700,308];break;
     case 180:return [73700,308];break;
     case 200:return [94600,400];break;
	 default:return [0,0];
    }
   }else{
    length -=1000;
    switch (height){
     case 150:return [rabiza_khzdvz_MAXx150];break;
     case 170:return [rabiza_khzdvz_MAXx170];break;
     case 180:return [rabiza_khzdvz_MAXx180];break;
     case 200:return [rabiza_khzdvz_MAXx200];break;
	 default:return [0,0];
    }
   }
  }
  var spspolo = function(){
   switch (fittings){
    case 1:return 40;
    case 2:return 80;
    default:return 0;
   }
  }

  bsdpaArr = bsdpa()
  var sum = Math.floor((bsdpaArr[0] + length*(bsdpaArr[1])+(form.find('[data-name="length"]').val().replace(/[^\d]/gi,'') * spspolo()))+gate+wicket+(demontag*length)+(afterMkad*mkadKoef));
  form.find('[data-name="summ"]').text(sum);
  
  height = jQuery(".sel_imul:eq(0)").attr("val"),
  length = jQuery("#length_input").val(),
  kvovo = jQuery(".sel_imul:eq(1)").attr("val"),//k-vo vorot
  kvokal = jQuery(".sel_imul:eq(2)").attr("val"),
  fittings = jQuery(".sel_imul:eq(3)").attr("val"),
  bsdpn = jQuery("#bstdponapr").attr("val"), //b-vaya s-t dostavki
  kkzamkad = jQuery("#kkmzamkad_input").val()
 }
}

//Забор из дерева
function fence_wood(form){
 form.find('[data-name]').each(function(){$(this).bind('change, keyup',function(){recalc()})})
 function recalc(){
  var length=form.find('[data-name="length"]').val().replace(/[^\d]/gi,'')/1;
  var afterMkad = form.find('[data-name="afterMkad"]').val().replace(/[^\d]/gi,'')/1;
  //Обновляем инпут до числового значения
  if (form.find('[data-name="length"]').val() != length) form.find('[data-name="length"]').val(length)
  if (form.find('[data-name="afterMkad"]').val() != afterMkad) form.find('[data-name="afterMkad"]').val(afterMkad)
  
  var type=form.find('[data-name="type"] option:selected').val()/1;
  var gate=form.find('[data-name="gate"] option:selected').val()/1;
  var gateWidth=form.find('[data-name="gateWidth"] option:selected').val()/1;
  var wicket=form.find('[data-name="wicket"] option:selected').val()/1;
  var generator=800;
  //Проверяем генератор
  if (form.find('[data-name="generator"]').is(":not(:checked)")) generator = 0;
  var subtr = 0;
  
  if ((gate!=0)&&(wicket!=0)){subtr=parseFloat(subtr-1500);}
  if ((gate>=2)&&(wicket>1)){subtr=parseFloat(subtr-1500);}
  if ((gate>=3)&&(wicket>=3)){subtr=parseFloat(subtr-1500);}
  if ((gate>=4)&&(wicket>=4)){subtr=parseFloat(subtr-1500);}
  if ((gate==5)&&(wicket==5)){subtr=parseFloat(subtr-1500);}

  switch(gate){
	case 1:gate = 8200;break;
	case 2:gate = 17400;break;
	case 3:gate = 26600;break;
	case 4:gate = 35800;break;
	case 5:gate = 45000;break;
	default:break;
  }
  switch(wicket){
	case 1:gate = 4300;break;
	case 2:gate = 8600;break;
	case 3:gate = 12900;break;
	case 4:gate = 17200;break;
	case 5:gate = 21500;break;
	default:break;
  }
  if ((gateWidth==2) || (gateWidth==3)){switch (gate){
   case 8200:gate+=1000;break;
   case 17400:gate+=2000;break;
   case 26600:gate+=3000;break;
   case 35800:gate+=4000;break;
   case 45000:gate+=5000;break;}
  }
  var summ=length*type+wicket+gate+subtr+generator+(afterMkad*30);
  form.find('[data-name="summ"]').text(summ)
 }
}

function fence_shtak(form){
 form.find('[data-name]').each(function(){$(this).bind('change, keyup',function(){recalc()})})
 function recalc(){
  var length=form.find('[data-name="length"]').val().replace(/[^\d]/gi,'')/1;
  var afterMkad=form.find('[data-name="afterMkad"]').val().replace(/[^\d]/gi,'')/1;
  //Обновляем инпут до числового значения
  if (form.find('[data-name="length"]').val() != length) form.find('[data-name="length"]').val(length)
  if (form.find('[data-name="afterMkad"]').val() != afterMkad) form.find('[data-name="afterMkad"]').val(afterMkad)
  
  var height=form.find('[data-name="height"] option:selected').val()/1;
  var cover=form.find('[data-name="cover"] option:selected').val()/1;
  var lag=form.find('[data-name="lag"] option:selected').val()/1;
  var gate=form.find('[data-name="gate"] option:selected').val()/1;
  var gateWidth=form.find('[data-name="gateWidth"] option:selected').val()/1;
  var wicket=form.find('[data-name="wicket"] option:selected').val()/1;
  var generator=1;
  var pillar = 0;
  var pillarHeight = 1;
  //Проверяем генератор
  if (form.find('[data-name="generator"]').is(":not(:checked)")) generator = 0;
  
  //Первая строка таблицы
  var tr10 = form.find('[data-td="tr10"]');
  switch (height){
   case 200:tr10.text("Столб проф.труба 60 x 60 мм. h=3000 мм.");break;
   case 180:tr10.text("Столб проф.труба 60 x 60 мм. h=2800 мм.");break;
   case 150:tr10.text("Столб проф.труба 60 x 60 мм. h=2500 мм.");break;
  }
  //Количество столбов
  if (gate == 0 && wicket <=1) pillar = 1;
  form.find('[data-td="tr11"]').text(Math.floor((length-wicket-(gate*gateWidth/1000))/(25/10)+ pillar));
  //Цена
  var tr13 = form.find('[data-td="tr13"]');
  switch (height){
   case 150:tr13.text(450);break;
   case 180:tr13.text(504);break;
   case 200:tr13.text(540);break;
  }
  //Сумма
  form.find('[data-td="tr14"]').text(tr13.text()*form.find('[data-td="tr11"]').text());
  
  //Вторая строка таблицы
  switch (lag){
   case 2:form.find('[data-td="tr20"]').text("Лаги проф. труба 40 x 20 мм. (в два ряда)");break;
   case 3:form.find('[data-td="tr20"]').text("Лаги проф. труба 40 x 20 мм. (в три ряда)");break;
  }
  //Количество п.метров
  form.find('[data-td="tr21"]').text(Math.floor((~~length-wicket-(gate*gateWidth/1000))*lag));
  form.find('[data-td="tr23"]').text(66);
  //Сумма
  form.find('[data-td="tr24"]').text(form.find('[data-td="tr21"]').text()*form.find('[data-td="tr23"]').text())
  
  //Третья строка таблицы
  // Количество погонных метров
  switch (height){
   case 150:pillarHeight = 2.5;break;
   case 180:pillarHeight = 2.8;break;
   case 200:pillarHeight = 3;break;
  }
  form.find('[data-td="tr31"]').text(Math.floor(~~form.find('[data-td="tr21"]').text() + (~~form.find('[data-td="tr11"]').text()) + (24 * gate) + (12 * wicket)));
  form.find('[data-td="tr33"]').text(17);
 //Сумма
  form.find('[data-td="tr34"]').text(form.find('[data-td="tr31"]').text()*form.find('[data-td="tr33"]').text())
  
  // Четвёртая строка "Евро штакет. СТРОНГ"  
  var tr40 = "";var tr43 = "";
  switch (height){
   case 150:switch (cover){
    case 1:tr40 = "Евроштакетник цветной h=1500 мм.";tr43=75;break;
    case 2:tr40 = "Евроштакетник двухсторонний h=1500 мм.";tr43=86;break;
    case 3:tr40 = "Евроштакетник цвет дерева h=1500 мм.";tr43=98;break;
   }break;
   case 180:switch (cover){ 
    case 1:tr40 = "Евроштакетник цветной h=1800 мм.";tr43=90;break;
    case 2:tr40 = "Евроштакетник двухсторонний h=1800 мм.";tr43=103;break;
    case 3:tr40 = "Евроштакетник цвет дерева h=1800 мм.";tr43=117;break;
   }break;
   case 200:switch (cover){
    case 1:tr40 = "Евроштакетник цветной h=2000 мм.";tr43=100;break;
    case 2:tr40 = "Евроштакетник двухсторонний h=2000 мм.";tr43=114;break;
    case 3:tr40 = "Евроштакетник цвет дерева h=2000 мм.";tr43=130;break;
   } break;
  }
  form.find('[data-td="tr40"]').text(tr40);form.find('[data-td="tr43"]').text(tr43);
  //Количество штук штакетника
  form.find('[data-td="tr41"]').text(Math.floor(length*6.46));
  //Сумма
  form.find('[data-td="tr44"]').text(form.find('[data-td="tr43"]').text()*form.find('[data-td="tr41"]').text())

  //Пятая строка таблицы
  switch (gateWidth){
   case 4000: form.find('[data-td="tr50"]').text("Ворота распашные, шириной 4 м.");break;
   case 3500: form.find('[data-td="tr50"]').text("Ворота распашные, шириной 3,5 м.");break;
   case 3000: form.find('[data-td="tr50"]').text("Ворота распашные, шириной 3 м.");break;
  }
  //Количество ворот
  form.find('[data-td="tr51"]').text(gate);  
  //Цена
  form.find('[data-td="tr53"]').text(3900);
  //Сумма
  form.find('[data-td="tr54"]').text(form.find('[data-td="tr53"]').text()*form.find('[data-td="tr51"]').text())
  
  //Шестая строка таблицы
  //Количество калиток
  form.find('[data-td="tr61"]').text(wicket);
  //Цена
  form.find('[data-td="tr63"]').text(2666);
  //Сумма
  form.find('[data-td="tr64"]').text(form.find('[data-td="tr63"]').text()*form.find('[data-td="tr61"]').text())
  
  //Сельмая строка таблицы
  //Количество метров
  form.find('[data-td="tr71"]').text(length)
  // Цена
  if (lag == 2) form.find('[data-td="tr73"]').text(340);
  else if (lag == 3) form.find('[data-td="tr73"]').text(370);
  // Сумма
  form.find('[data-td="tr74"]').text(form.find('[data-td="tr73"]').text()*form.find('[data-td="tr71"]').text())
  
  //Восьмая строка таблицы
  //Количество
  form.find('[data-td="tr81"]').text(afterMkad);
  //Цена
  form.find('[data-td="tr83"]').text(28);
  //Сумма
  form.find('[data-td="tr84"]').text(form.find('[data-td="tr83"]').text()*form.find('[data-td="tr81"]').text())
  
  //Девятая строка таблицы
  // Количество
  if (generator){
	if (length < 55) form.find('[data-td="tr91"]').text(length);
	  else form.find('[data-td="tr91"]').text(length);
  } else form.find('[data-td="tr91"]').text(0);
  form.find('[data-td="tr93"]').text(10);
  form.find('[data-td="tr94"]').text(form.find('[data-td="tr93"]').text()*form.find('[data-td="tr91"]').text())
  
  
  //ИТОГО ПО МАТЕРИАЛАМ
  var itogMat = ~~form.find('[data-td="tr14"]').text() + ~~form.find('[data-td="tr24"]').text() + ~~form.find('[data-td="tr34"]').text() + ~~form.find('[data-td="tr44"]').text() + ~~form.find('[data-td="tr54"]').text() + ~~form.find('[data-td="tr64"]').text();
  form.find('[data-name="itogMat"]').val(itogMat);
  //ЗА РАБОТУ
  var itogWork = ~~form.find('[data-td="tr74"]').text();
  form.find('[data-name="itogWork"]').val(itogWork);
  //ИТОГО ЗА ВСЕ
  worlAll = ~~itogMat+~~itogWork+~~form.find('[data-td="tr84"]').text()+~~form.find('[data-td="tr94"]').text();
  form.find('[data-name="itogAll"]').val(worlAll);
 }
}