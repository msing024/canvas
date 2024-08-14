import random
def guessingGame():
    randomNumber = random.randrange(1,100)
    attempt = 1
    print("A random number from 1 to 100 has been generated. Try to guess the number")
    while (attempt <=7):
        print("This is attempt number " + str(attempt) + ".")
        print("Input your guess now")
        guess = int(input())
        if (guess > randomNumber):
            print("Your guess is too high, try again.")
        elif (guess < randomNumber):
            print("Your guess is too low, try again.")
        elif (guess == randomNumber):
            print("Your guess is correct, Good Job. It took you " + str(attempt) + " guess/guesses to get the correct number.")
            break
        attempt = attempt + 1
    if (attempt > 7):
        print("You have run out of attempts and lost the game!")
    
guessingGame()
        