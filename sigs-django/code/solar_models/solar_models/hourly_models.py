from math import pi, sin, cos, acos

class BaseSolarModels:
    def __init__(self, unit="radians"):
        self.unit = unit

    def store_angle(self, value, current_unit):
        if self.unit == current_unit:
            return value
        if self.unit == "radians" and current_unit == "degrees":
            return self.to_radians(value)
        elif self.unit == "degrees" and current_unit == "radians":
            return self.to_degrees(value)
        else:
            return None 
        
    def to_radians(self, deg):
        return deg * pi / 180
    
    def to_degrees(self, rad):
        return rad * 180 / pi


class DeclinationAngleModel(BaseSolarModels):
    def __init__(self, day_number, unit="radians"):
        super().__init__(unit)
        self.day_angle_in_radians = self.day_angle_in_radians_formula(day_number)
        self.day_number = day_number
    
    def run(self):
        return self.declination_angle_formula()

    def declination_angle_formula(self):
        f1 = 0.006918 
        f2 = 0.399912 * cos(self.day_angle_in_radians)
        f3 = 0.070257 * sin(self.day_angle_in_radians)
        f4 = 0.006758 * cos(2 * self.day_angle_in_radians)
        f5 = 0.000907 * sin(2 * self.day_angle_in_radians)
        f6 = 0.002697 * cos(3 * self.day_angle_in_radians)
        f7 = 0.00148 * sin(3 * self.day_angle_in_radians)
        return self.store_angle(f1 - f2 + f3 - f4 + f5 - f6 + f7, "radians")

    def day_angle_in_radians_formula(self):
        return 2 * pi * ((self.day_number - 1)/ 365)

class HourAngleModel(BaseSolarModels):
    def __init__(self, day_number, latitude, longitude, local_time, unit="radians"):
        super().__init__(unit=unit)
        self.local_time = local_time
        self.latitude = self.store_angle(latitude, "degrees")
        self.longitude = self.store_angle(longitude, "degrees")
    
    def run(self):
        return self.hour_angle_formula()

    def hour_angle_formula(self):
        local_solar_time = self.local_solar_time_formula()
        return self.store_angle(15 * (12 - local_solar_time), "degrees")
    
    def local_solar_time_formula(self):
        # Assumed Ls is 0. Therefore need to use GMT
        if self.unit == "radians":
            latitude = self.to_degrees(self.latitude)
        else:
            latitude = self.latitude

        ET = self.equation_of_time_formula()
        return self.local_time + (ET / 60) + (4 / 60) * (self.longitude)
    
    def equation_of_time_formula(self):
        B = self.B_formula(self.day_number)
        f1 = 9.87 * sin(2 * B)
        f2 = 7.53 - cos(B)
        f3 = 1.5 * cos(B)
        return f1 - f2 - f3
    
    def B_formula(self):
        return (360 * (self.day_number - 81)) / 365

class SunsetHourAngleModel(BaseSolarModels):
    def __init__(self, declination_angle, latitude, unit="radians"):
        super().__init__(unit=unit)
        self.declination_angle = declination_angle
        self.longitude = self.store_angle(longitude, "degrees")
    
    def run(self):
        return self.sunset_hour_angle_formula()

    def sunset_hour_angle_formula(self):
        return tan(self.declination_angle) * tan(self.latitude)


class HourlyExtraterrestrialRadiationModel(BaseSolarModels):
    def __init__(self, day_number, declination_angle, w1, w2, unit="radians"):
        super().__init__(day_number, unit=unit)
        self.latitude = self.store_angle(latitude, "degrees")
        self.w1 = w1
        self.w2 = w2
    
    def run(self)
        self.eccentricity_formula()
        return self.hourly_extraterrestrial_radiation_model()

    def hourly_extraterrestrial_radiation_model(self):
        Isc = 1.361 # Kw/M**2
        formula_part_1 =  ((12 * 3.6) / pi) * Isc * E0
        formula_part_2 = (sin(self.latitude) * cos(self.declination_angle)) * ((sin(self.w2) - sin(self.w1)))
        formula_part_3 = (pi * (self.w2 - self.w1))/180)) * (sin(self.latitude) * sin(self.declination_angle))
        return formula_part_1 * (formula_part_2 - formula_part_3)
    
    def eccentricity_formula(self):
        self.E0 = 1 + 0.0033 * cos(((2 * pi * self.day_number) / 365))


class LiuJordanModel(BaseSolarModels):
    def __init__(self, hour_angle, sunset_hour_angle, unit="radians"):
        super().__init__(unit)
        self.hour_angle = hour_angle
        self.sunset_hour_angle = sunset_hour_angle

    def run(self):
        return self.lj_model()

    def lj_model(self):
        numerator = cos(self.hour_angle) - cos(self.sunset_hour_angle)
        demoninator = sin(self.sunset_hour_angle) - (((pi * self.sunset_hour_angle)/180) * cos(self.sunset_hour_angle))
        return (pi/24) * (numerator / denominator)


class ErbsModel(SolarModels):
    def __init__(self, Io, unit="radians"):
        super().__init__(unit)
        Ih = 0 #TODO: get Ih from django model
        self.Mt = Io / Ih

    def erbs_model(Io):
        if Mt <= 0.22:
            return 1 - 0.09 * Mt
        elif Mt > 0.22 and Mt > 0.8:
            return 0.9511 - (0.1604 * Mt) + (4.388 * Mt**2) - (16.638 * Mt**3) + (12.336 * Mt**4)
        else:
            return 0.165


class PerezModel(SolarModels):
    def a1_formula(self):
        return max([0, cos(self.incidence_angle)])

    def a2_formula(self):
        return max([cos(85), cos(self.zenith_angle)])

    def delta_formula(self, Id, Io):
        return (1 / cos(self.zenith_angle) * (Id/Io))

    def F1_formula(self):
        return max)([0, ])

    def F2_formula(self):

    def perez_model(self, Id, F1, F2, a1):
        a1 = a1_formula()
        a2 = a2_formula()
        return Id  * ((1 + cos(self.tilt) +  (a1/a2) + sin(self.tilt)))

    

class SolarModels:
    def __init__(self, latitude, day_number, longitude=None, tilt=None, panel_angle=None, local_time=None):
        self.latitude = latitude
        self.latitude_radians = self.to_radians(latitude)
        self.longitude = longitude
        if self.longitude is not None:
            self.longitude_radians = self.to_radians(longitude)
        self.day_number = day_number
        self.tilt = tilt
        if self.tilt is not None:
            self.tilt_radiians = self.to_radians(tilt)
        self.panel_angle = panel_angle
        if self.panel_angle is not None:
            self.panel_angle_radians = self.to_radians(panel_angle)
        self.local_time = local_time
    
    # ----------------------------------------------------
    # Erbs model formula
    # ----------------------------------------------------

    def zenith_angle_formula(self):
        self.declination_angle_formula()
        self.hour_angle_formula()
        f1 = sin(self.latitude_radians) * sin(self.declination_angle_radians)
        f2 = cos(self.latitude_radians) * cos(self.declination_angle_radians) * cos(self.hour_angle_radians)
        self.zenith_angle = 1 / cos(f1 + f2)
        self.zenith_angle_radians = self.zenith_angle * 180 / pi

    # def incidence_angle_facing_equator_formula(day_number, local_time, latitude, longitude):
    #     declination_angle = declination_angle_formula(day_number)
    #     hour_angle = hour_angle_formula(local_time, day_number, longitude)
    #     f1 = sin(declination_angle) * sin(latitude)
    #     f2 = cos(declination_angle) * cos(latitude) * cos(hour_angle)
    #     return f1 + f2

    def incidence_angle_all_directions_formula(self):
        f1 = sin(self.latitude_radians) * sin(self.declination_angle_radians) * cos(self.tilt_radians)
        f2 = cos(self.latitude_radians) * sin(self.declination_angle_radians) * sin(self.tilt_radians) * cos(self.panel_angle_radians)
        f3 = cos(self.latitude_radians) * cos(self.declination_angle_radians) * cos(self.tilt_radians) * cos(self.hour_angle_radians) 
        f4 = sin(self.latitude_radians) * cos(self.declination_angle_radians) * sin(self.tilt_radians) * cos(self.hour_angle_radians) * cos(self.panel_angle_radians)
        f5 = cos(self.declination_angle_radians) * sin(self.tilt_radians) * sin(self.hour_angle_radians) * sin(self.panel_angle_radians)
        self.incidence_angle_radians = acos(f1 - f2 + f3 + f4 + f5)
        self.incidence_angle = self.incidence_angle * 180 / pi
    
    def solar_azimuth_angle_formula(self):
        return (sin(self.declination_angle_radians) * sin(latitude)) + (cos(self.declination_angle_radians) + cos(self.latitude_radians) + cos(self.hour_angle_radians))

    def surface_solar_azimuth_angle_formula(self):
        return self.solar_azimuth_angle_radians - self.incidence_angle_radians


        

# ----------------------------------------------------
# Liu and Jordan model
# ----------------------------------------------------





# clearness_dict = {
#     "bin_1": {
#         "F11":   
#         "F12": 
#         "F13": 
#         "F21":
#         "F22":
#         "F23":
        
#     },
#     "bin_2": {
        
#     },
#     "bin_3": {
        
#     },
#     "bin_4": {
        
#     },
#     "bin_5": {
        
#     },
#     "bin_6": {
        
#     },
#     "bin_1": {
        
#     },
#     "bin_1": {
        
#     },
# }
