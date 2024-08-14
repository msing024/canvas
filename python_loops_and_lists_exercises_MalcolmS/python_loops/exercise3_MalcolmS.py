def partial_sums(numbers_list):
    sum_list = []
    calculationNumber = 0
    while(len(numbers_list) > 0):
        calculationNumber = calculationNumber + 1
        item1 = numbers_list[0]
        item2 = numbers_list[len(numbers_list) - 1]
        numbers_list.pop(0)
        numbers_list.pop(len(numbers_list) - 1)
        print("Removing the two numbers " + str(item1) + " and " + str(item2) + " from the inital list...")
        itemSum = item1 + item2
        sum_list.append(itemSum)
        print("Adding the sum of the two numbers (" + str(itemSum) + ") to the list.")
        print("This is calculation number: " + str(calculationNumber) + ".")
    print(sum_list)
    return (sum_list)

testList = [45,34,6,12,89,33,84,23]

partial_sums(testList)