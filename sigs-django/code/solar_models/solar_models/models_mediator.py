from solar_models.solar_models.hourly_models import DeclinationAngleModel, HourAngleModel, \
    HourlyExtraterrestrialRadiationModel, LiuJordanModel, PerezModel, ErbsModel, SunsetHourAngleModel

class SolarModelsMediator:
    def __init__(self):
        """
        Potential kwargs:
        day_number, latitude, longitude, local_time, local_time_2
        """
        self._declination_angle_model = DeclinationAngleModel
        self._hour_angle_model = HourAngleModel
        self._sunset_hour_angle_model = SunsetHourAngleModel
        self._hourly_et_rad_model = HourlyExtraterrestrialRadiationModel
        self._liu_jordan_model = LiuJordanModel
        self._perez_model = PerezModel
        self._erbs_model = ErbsModel
    
    def calculate_declination_angle(self, day_number):
        self.day_number = day_number
        model = self._declination_angle_model(day_number)
        return model.run()
    
    def calculate_hour_angle(self, day_number, latitude, longitude, local_time):
        model = self._hour_angle_model(day_number, latitude, longitude, local_time)
        return model.run()

    def calculate_sunset_hour_angle(self, day_number, latitude):
        declination_angle = self.calculate_declination_angle(day_number)
        model = self._sunset_hour_angle_model(latitude, declination_angle)
        return model.run() 
    
    def calculate_hourly_et_rad(self, day_number, latitude, longitude, local_time_1, local_time_2):
        declination_angle = self.calculate_declination_angle(day_number)
        hour_angle_1 self.calculate_hour_angle(day_number, latitude, longitude, local_time_1)
        hour_angle_2 self.calculate_hour_angle(day_number, latitude, longitude, local_time_2)
        model = self._hourly_et_rad_model(day_number, declination_angle, hour_angle_1, hour_angle_2)
        return model.run()
    
    def run_liu_jordan_model(self, day_number, latitude, longitude, local_time):
        sunset_angle = self.calculate_sunset_hour_angle(day_number, latitude)
        hour_angle = self.calculate_hour_angle(day_number, latitude, longitude, local_time)
        model = self._liu_jordan_model(hour_angle, sunset_angle)
        return model.run()
    
    def run_erbs_model():

    
    def get_hourly_values_from_daily(self, day_number, latitude, longitude, local_time):
        return self.run_liu_jordan_model()
    
    def get_hourly_diffuse_component(self):
        pass
    
    def get_hourly_tilted_values(self):
        pass

