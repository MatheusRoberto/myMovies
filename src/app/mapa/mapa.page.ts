import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit } from '@angular/core';
import { GoogleMap, GoogleMaps, MarkerOptions, GoogleMapsEvent, Marker } from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  public coordenadas = { latitude: 0, longitude: 0 };
  map: GoogleMap;
  marker: Marker;

  constructor(public geolocation: Geolocation, private platform: Platform) {

  }

  getCoordenadas() {
    const stream = this.geolocation.watchPosition();
    stream.subscribe(data => {
      this.coordenadas.latitude = data.coords.latitude;
      this.coordenadas.longitude = data.coords.longitude;
    });
  }

  async ngOnInit() {
    this.getCoordenadas();
    await this.platform.ready();
    await this.loadMap();
  }

  async loadMap() {
    const mapOptions = {
      mapType: 'MAP_TYPE_NORMAL',
      camera: {
        target: {
          lat: this.coordenadas.latitude,
          lng: this.coordenadas.longitude
        },
        zoom: 14
      },
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
  }

  async localizar() {
    const options: MarkerOptions = {
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.coordenadas.latitude,
        lng: this.coordenadas.longitude
      }
    };

    this.marker = await this.map.addMarker(options);

    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe( _ => {
      this.marker.setAnimation('BOUNCE');
    });
  }
}
