def listProcessing(aList):
    listSum = 0
    minimum = aList[0]
    maximum = aList[0]
    for i in aList:
        listSum = listSum + i
        if (i < minimum):
            minimum = i
        if (i > maximum):
            maximum = i
        
    mean = listSum/len(aList)
    print("Your final list was:")
    print(aList)	
    print("The total of the list is " + str(listSum) + ".")
    print("The count of the list is " + str(len(aList)) + ".")
    print("The maximum of the list is " + str(maximum) + ".")
    print("The minimum of the list is " + str(minimum) + ".")
    print("The average of the numbers in the list is " + str(mean) + ".")
    
def readingNumbers():
    userList = []
    userInput = ""
    while(userInput != "done"):
        print("Please enter a number or enter 'done' if you are finished entering numbers.\n")
        userInput = input()
        if (userInput == "done"):
            break
        elif (not userInput.isdigit()):
            print("\nPlease enter a proper number! \n")
            continue
        userInt = int(userInput)
        userList.append(userInt)
    
    if (len(userList) == 0):
        print("You did not input any numbers and consequently the list of numbers is empty and cannot be processed.")
    else:
        listProcessing(userList)
    return (userList)

readingNumbers()
            
    