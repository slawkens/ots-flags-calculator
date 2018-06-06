$( function() {
	$('#tabs').tabs();

	$('#standard-flags input').on('click', function() {
		calcFlags();
	});

	$('#custom-flags input').on('click', function() {
		calcFlags('custom');
	});
} );

function biAND(flags, flag)
{
	for (var i = 0; i < flags.digits.length; ++i)
	{
		if(i < flag.digits.length)
		{
			var r1 = flags.digits[i]
			var r2 = flag.digits[i]
			var result = r1 & r2
			if(result != 0)
				return true
		}
	}

	return false
}

function calcFlags(custom = 'nope')
{
	var element = document.flagform;
	if(custom === 'custom')
		element = document.customflagform;

	var flags = biFromDecimal("0");
	for (var i = 0; i < element.elements.length; i++)
	{
		if(element.elements[i].checked)
		{
			var flag = biFromDecimal(element.elements[i].value);
			flags = biAdd(flags, flag);
		}
	}

	if(custom === 'custom')
		document.customresultform.customflagresult.value = biToString(flags, 10);
	else
		document.resultform.flagresult.value = biToString(flags, 10);
}

function calcCheckboxes(custom = 'nope')
{
	var element = document.flagform;
	if(custom === 'custom')
		element = document.customflagform;

	var flags = biFromDecimal("0");
	if(custom === 'custom')
		flags = biFromDecimal(document.getElementById('customflagresult').value);
	else
		flags = biFromDecimal(document.getElementById('flagresult').value);

	for (var i = 0; i < element.elements.length; i++)
	{
		var flag = biFromDecimal(element.elements[i].value);
		element.elements[i].checked = biAND(flags, flag)
	}
}
