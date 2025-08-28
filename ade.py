import random
#random.randint(0,5)
#input("texte :")


def deviner():
    ne = 1
    nb_ale = random.randint(0,20)
    print("Deviner un nombre entre 0 et 20")
    while True:
        reponse = int(input("Nombre choisis : "))
        if reponse == nb_ale:
            print("Good vous avez trouvé : ", nb_ale,"\nessaie :", ne)
            return
        else:
            print("Vous avez pas trouvé")
            ne = ne+1
            if reponse < nb_ale :
                print ("le nombre est plus grand")
            else :
                print ("le nombre est plus petit")
    
deviner()


liste = [1,2,5,4]

def produit_elements(liste):
    total_produit = 1
    for entier in liste:
        total_produit = total_produit * entier
        print(total_produit)
    return total_produit


# print(produit_elements(liste))


"""
var liste == x = [1;9]

fonction Un+1 = Un*n
U0 = 1

"""


def maximum(liste):
    superieur = liste[0]
    for x in range(1,len(liste)):
        # print(f"index : {x} | valeur : {liste[x]}")
        if superieur >= liste[x]:
            superieur = liste[x]
    return superieur

# print(maximum(liste))


def mux_liste(liste1, liste2):
    liste3 = [0] * len(liste1)
    for x in range(0,len(liste1)):
        liste3[x] = liste1[x]*liste2[x]
        print(liste3[x])


# mux_liste([1,2], [2,3])

str_liste = ["1", "5"]
int_liste = [5, 7]

def mux(liste1, liste2):
    liste3 = [0] * len(liste1)
    for x in range(0,len(liste1)):
        liste3[x] = int(liste1[x])*liste2[x]
        print(liste3[x])

# mux(str_liste, int_liste)

texte = "Ah, donc tu veux des idées de fonctions Python pour apprendre à coder, mais sans lien direct avec les maths ? Voici quelques idées amusantes et utiles"

def trouver_mot(texte,mot):
   print(texte.count(mot))


trouver_mot(texte, "idées")