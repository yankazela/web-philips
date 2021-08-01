const {mapResult, validateDate, validateCount} = require ('../src/processRequests')
const mockData = require('./mockData')

test('Testing the result mapping', () => {
    const result = mapResult(mockData)
    expect(result.code).toBe(0)
    expect(result.msg).toBe('Success')
    expect(Object.keys(result.records[0])).toEqual(['key', 'createdAt', 'totalCount'])
    expect(result.records.length).toBe(5)
    expect(result.records[3].totalCount).toBe(954)
})

test('Testing date validation', () => {
    const date_one = validateDate('startDate', '2015-06-25')
    const date_two = validateDate('startDate', '')
    const date_three = validateDate('startDate', '07-06-2018')
    const date_four = validateDate('startDate', '2015-02-31')
    const date_five = validateDate('endDate', '2015-06-31')
    const date_six = validateDate('startDate')

    expect(date_one).toBe(null)
    expect(date_two).toBe('startDate is missing from the input. Date must in YYYY-MM-DD format.')
    expect(date_three).toBe('startDate 07-06-2018 is invalid. Date must in YYYY-MM-DD format.')
    expect(date_four).toBe('startDate 2015-02-31 is invalid. Date must in YYYY-MM-DD format.')
    expect(date_five).toBe('endDate 2015-06-31 is invalid. Date must in YYYY-MM-DD format.')
    expect(date_six).toBe('startDate is missing from the input. Date must in YYYY-MM-DD format.')
})

test('Testing count value validation', () => {
    const count_one = validateCount('minCount', 'heter')
    const count_two = validateCount('minCount', '46')
    const count_three = validateCount('minCount')
    const count_four = validateCount('maxCount', 88)

    expect(count_one).toBe('minCount heter is an invalid number.')
    expect(count_two).toBe(null)
    expect(count_three).toBe('minCount is missing from the input.')
    expect(count_four).toBe(null)
})

