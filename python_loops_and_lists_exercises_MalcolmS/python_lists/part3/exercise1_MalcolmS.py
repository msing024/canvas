careers = ["programmer", "engineer", "manager", "doctor", "lawyer"]
print("Index of programmer is " + str(careers.index("programmer")))
print("Length of list is " + str(len(careers)))
if ("engineer" in careers):
    print("Engineer is in careers")
    
careers.append("architect")
careers.insert(0, "car driver")
print("The new length of the list is " + str(len(careers)))