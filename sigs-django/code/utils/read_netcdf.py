#!/usr/bin/env python2

from netCDF4 import Dataset
import argparse
import os
import numpy as np
from datetime import datetime, timedelta

from solar_models.models import DailyGlobalIrradiance

# from utils.read_netcdf import *
# ExtractDataFromNetcdf().extract_data_and_save_in_db()

class ExtractDataFromNetcdf:
    def __init__(self, path="/code/solar_models/data", lat_border=[32, 65], lon_border=[-10, 30]):
        self.path = path
        self.lat_border = lat_border
        self.lon_border = lon_border
    
    def extract_data_and_save_in_db(self):
        files = os.listdir(self.path)
        for fil in files:
            netcdf_file = Dataset("{}/{}".format(self.path, fil), "r", format="NETCDF4")
            
            # lat_idx = np
            lat_reduced, lon_reduced, data_reduced = self.cut_array(netcdf_file)
            it = np.nditer(data_reduced, flags=["multi_index"])
            while not it.finished:
                # import pdb; pdb.set_trace()
                lat = lat_reduced[it.multi_index[0]]
                lon = lon_reduced[it.multi_index[1]]
                date = datetime(1983,1,1) + timedelta(hours=int(netcdf_file.variables[u"time"][0].data))
                value = round(np.float64(it.value).item(), 2)
                if value == -999:
                    value = None
                
                if str(lat)[::-1].find('.') == 1 and str(lon)[::-1].find('.') == 1:
                    # import pdb; pdbs.set_trace()
                    DailyGlobalIrradiance(
                        latitude=round(np.float64(lat).item(), 2),
                        longitude=round(np.float64(lon).item(), 2),
                        date=date,
                        horizontal_CMSAF=value
                    ).save()
                it.iternext()
    
    def cut_array(self, netcdf_file):
        lon = np.asarray(netcdf_file[u"lon"])
        lat = lon = np.asarray(netcdf_file[u"lat"])
        lon_idx = np.where((lon > -10) & (lon < 30))[0]
        lat_idx = np.where((lat > 32) & (lat < 65))[0]
        data_reduced = np.asarray(netcdf_file[u"SID"])[0, np.min(lat_idx):np.max(lat_idx), np.min(lon_idx):np.max(lon_idx)]
        return lat[lat_idx], lon[lon_idx], data_reduced




# netcdf_file = Dataset("SIDdm201802200000410231000101MA.nc", "r", format="NETCDF4")
