provincesList = ["Ontario", "Quebec", "British Columbia", "Newfoundland & Labrador", "Manitoba"]
provincesMessages = ["The capital of Canada is located in ", "There is a large french speaking population in ", "The city of Vancouver is located in ", "The newest Canadian province is ", "One of Canada's provinces is "]

for i in range(5):
    print(str(i) + ": " + provincesMessages[i] + provincesList[i] + ".")
    