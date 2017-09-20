$('.apply-p .el-radio').on('click', function () {
  $(this).find('.el-radio__input').addClass('is-checked').parent().siblings().find('.el-radio__input').removeClass('is-checked')
})

$('.apply-p .el-select-dropdown__item').hover(function () {
  $(this).addClass('hover')
}, function () {
  $(this).removeClass('hover')
})

$('.apply-method-select .el-select').on('click', function () {
  console.log(1)
  if ($('.apply-method-select .el-select-dropdown').css('display') == 'none') {
    $('.apply-method-select .el-select-dropdown').css('display', 'block')
  } else {
    $('.apply-method-select .el-select-dropdown').css('display', 'none')
  }
})

$('.apply-method-select .el-select-dropdown__item').on('click', function () {
  $(this).addClass('selected')
})

$('.baoming-info .apply-table tbody tr td input').on('keyup', function () {
  var val = $(this).val()
  var hasVal = $(this).parent().siblings("td.hasVal").html()
  var total = 0;
  if (/^\d+$/.test(val)) {
    if (Number(val) > Number(hasVal)) {
      $(this).val(hasVal)
      total = hasVal - 300
      $(this).parent().siblings('td.total-number').html(total)
    } else {
      total = hasVal - val
      $(this).parent().siblings('td.total-number').html(total)
    }
  }
  else {
    $(this).val("")
    total = hasVal
    $(this).parent().siblings('td.total-number').html(total)
  }
})

$('.form-control').select2({
  placeholder: "请选择",
  allowClear: true,
  minimumResultsForSearch: -1
})
$('.form-control').trigger('change.select2')

$('.form-control').change(function () {
  var discountPrice = $(this).val()
  var price = Number($(this).parent().siblings('td.price').html())
  var num = Number($(this).parent().siblings('td.num').html())
  var GSTs = Number($(this).parent().siblings('td.GST').html())
  var total = 0

  $(this).parent().siblings('td.discountPrice').html(discountPrice)

  $(this).parent().siblings('td.subtotal').html(price * num - discountPrice)

  $(this).parent().siblings('td.amountPayable').html(price * num - discountPrice + GSTs)

  $('.course-table tbody tr').each(function (i) {
    total += Number($(this).find('td.amountPayable').html())
  })

  $('.total span').html('￥' + total)
})

$('.apply-info-select').select2({
  placeholder: "请选择",
  minimumResultsForSearch: -1
})

$('.apply-info-select').on('select2:select', function (e) {
  var html = '<tr name="'+e.params.data.text+'">\n' +
    '                    <td>'+e.params.data.text+'</td>\n' +
    '                    <td>\n' +
    '                        <input type="text">\n' +
    '                    </td>\n' +
    '                    <td>\n' +
    '                        <input type="text">\n' +
    '                    </td>\n' +
    '                </tr>'
  $('.apply-info-table tbody').append(html)
})

$('.apply-info-select').on('select2:unselect', function (e) {
  console.log(1)
  $('.apply-info-table tbody tr').each(function (i) {
    if ($(this).attr('name') == e.params.data.text){
      $(this).remove()
    }
  })
})
