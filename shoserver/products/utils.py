def transform_to_rupiah_format(value):
    str_value = str(value)
    separate_decimal = str_value.split(".")
    after_decimal, before_decimal = separate_decimal[0], ''
    if len(separate_decimal) > 1:
        before_decimal = separate_decimal[1]

    reverse = after_decimal[::-1]
    temp_reverse_value = ""

    for index, val in enumerate(reverse):
        if (index + 1) % 3 == 0 and index + 1 != len(reverse):
            temp_reverse_value = temp_reverse_value + val + "."
        else:
            temp_reverse_value = temp_reverse_value + val

    temp_result = temp_reverse_value[::-1]

    result = f'Rp{temp_result},'

    if len(before_decimal) > 0:
        if len(before_decimal) > 2:
            result += before_decimal[:2]
        else:
            result += before_decimal
    else:
        result += '00'

    return result
