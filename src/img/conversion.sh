#!/bin/bash
for f in *.svg
do
  echo ${f::-3}
  convert -background none $f ${f::-3}png
done
