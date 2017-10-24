import os
from . import models
FOLDER_PATH = os.path.dirname(os.path.abspath(__file__))
test_file_path = os.path.join(FOLDER_PATH,"mock.csv")

def load_mock():
    print("Loading file...")
    print(test_file_path)
    poles = open(test_file_path,'r')
    print(models)
    for pole in poles:
        pass

    new_pole = models.Pole(owner = "Bob",
            lat = "1029",
            lon = "1000",
            pole_id = "Placeholder",
            light_type = "Placeholder",
            pole_mfg =  "Placeholder",
            fixture_mfg = "Placeholder",
            tech = "Placeholder",
            nema = "Placeholder",
            fiber =  "Placeholder",
            wireless = "Placeholder",
            energy_use =  "Placeholder",
            lumens = "Placeholder",
            past_energy_use = "Placeholder",
            misc = "Placeholder",
    );

    new_pole.save();
    
    print("Records made to db (database)...")