from math import pi, exp, cos

class KaplanisModel:
    def __init__(self, day, lat):
        self.value = self.model(day, lat)
    
    def latf(self, lat):
        return lat * (pi/180)

    def dayf(self, day):
        return ((2 * pi) / 365) * day

    def A1(self, lat):
        return (12.680 * exp(-1.523 * self.latf(lat))) - (15.820 * exp(-5.918 * self.latf(lat)))

    def B1(self, lat):
        return (-5.336 * exp(-1.270 * self.latf(lat))) * (cos(1.373 * self.latf(lat) - 1.795))

    def B2(self, lat):
        return (-3.744 * exp(-0.978 * self.latf(lat))) * (cos(-1.587 * self.latf(lat) + 1.837))

    def C1(self, lat):
        return (-3.37e-10 * exp(15.030 * self.latf(lat))) + (0.718 * exp(0.465 * self.latf(lat)))

    def C2(self, lat):
        return (1.434e14 * exp(-88.64 * self.latf(lat))) + (0.639 * exp(0.589 * self.latf(lat)))

    def D1(self, lat):
        return (-0.002 * exp(4.848 * self.latf(lat))) + (32.6 * exp(-8.874 * self.latf(lat)))

    def D2(self, lat):
        return (-0.029 * exp(2.715 * self.latf(lat))) + (0.857 * exp(-1.579 * self.latf(lat)))

    def model(self, day, lat):
        return (self.A1(lat) + self.B1(lat) * cos(self.C1(lat) * self.dayf(day) + self.D1(lat)) 
            + self.B2(lat) * cos(self.C2(lat) * self.dayf(day) + self.D2(lat)))

# import sys
# arg1 = float(sys.argv[1])
# arg2 = float(sys.argv[2])
# print("day: {}".format(arg1))
# print("lat: {}".format(arg2))

# model = KaplanisModel(arg1, arg2)
# result = model.value
# print("result: {}".format(result))