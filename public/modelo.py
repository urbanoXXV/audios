import pickle
import sys
import numpy as np
import librosa
import soundfile as sf
import os

filename = str('modelo_entrenado.sav')
loaded_model = pickle.load(open(filename, 'rb'))

path = sys.argv[1] #ubicacion del archivo de audio

Cnt_Coef = 15
segundos = 1 #segundos de separacion

carpeta_audios_wav = 'wav'
carpeta_segmentos = 'segmentos'

#Leer audio
data, fs = librosa.load(path)
#Limpio silencios
yt, index = librosa.effects.trim(data)
#print(len(yt))
#exit()
#Genero Segmentos
respuestas = []
for i in range (0,len(yt),fs*segundos):
  if i == 0:
    fragmento = yt[0:fs*segundos]
  else:
    fragmento = yt[i-fs*segundos:i]
  
  #print(fragmento)
  data_mfccs = librosa.feature.mfcc(fragmento, n_mfcc=Cnt_Coef)
  data_mfccs_final = data_mfccs.T
  #mcc = np.array(data_mfccs_final)
  #sf.write(carpeta_segmentos + '/audio_' + sujeto + '_'+str(numero_audio)+'_'+str(numero_segmento) + '.wav', yt[i-fs*segundos:i], fs)
  mcc_final = data_mfccs_final.mean(axis=0)
  #print(mcc_final)

  ired = []
  ired.append(mcc_final)
  
  respuesta = loaded_model.predict(ired)
  
  respuestas.append(int(respuesta[0]))

#print(respuestas)
mayor_incidencia = [respuestas.count(0),respuestas.count(1),respuestas.count(2),respuestas.count(3),respuestas.count(4),respuestas.count(5),respuestas.count(6)]
#print(mayor_incidencia)
mayor_incidencia_sorted = sorted(enumerate(mayor_incidencia),key=lambda x: x[1], reverse=True)
#print(mayor_incidencia_sorted)
index,valor = mayor_incidencia_sorted[0]
print(index)


