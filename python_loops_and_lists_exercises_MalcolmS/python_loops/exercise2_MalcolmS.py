counter = 1
while (counter <= 9):
    if (counter < 5):
        string = "*" * counter
    else:
        string = "*" * (10 - counter)
    print(string)
    counter = counter + 1