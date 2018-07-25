from solar_models.models import DailyGlobalIrradiance
from solar_models.solar_models.kaplanis_model import KaplanisModel
import numpy as np
import datetime


def convert_day_number_to_date(day):
    return datetime.datetime(2017, 1, 1) + datetime.timedelta(day - 1)

def calculate_irradience():
    lat = np.arange(35, 60, 0.1)
    for day in range(1, 366):
        for la in lat:
            model_instance =  KaplanisModel(day, la)
            global_daily_irradiance = model_instance.value
            # print(global_daily_irradience)
            DailyGlobalIrradiance(
                latitude=la,
                date=convert_day_number_to_date(day),
                horizontal_kaplanis=global_daily_irradiance
            ).save()
        

