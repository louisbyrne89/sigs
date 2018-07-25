#!/bin/bash

# Launch the angular frontend using ng serve with the correct environment
cmd="ng serve --environment=dev --host 0.0.0.0 --port 4200"
echo $cmd
$cmd

