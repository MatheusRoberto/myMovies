import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit } from '@angular/core';
import { GoogleMap, GoogleMaps, MarkerOptions, GoogleMapsEvent, Marker, LatLng } from '@ionic-native/google-maps/ngx';

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

  async getCoordenadas() {
    const stream = await this.geolocation.watchPosition();
    await stream.subscribe(data => {
      this.coordenadas.latitude = data.coords.latitude;
      this.coordenadas.longitude = data.coords.longitude;
    });
    console.log(this.coordenadas);
  }

  async ngOnInit() {
    await this.getCoordenadas();
    await this.platform.ready();
    await this.loadMap();
  }

  async loadMap() {
    await this.geolocation.getCurrentPosition().then(async (position) => {
      this.coordenadas.latitude = position.coords.latitude;
      this.coordenadas.longitude = position.coords.longitude;
      console.log(this.coordenadas);
      const latlng = new LatLng(position.coords.latitude, position.coords.longitude);
      const mapOptions = await {
        mapType: 'MAP_TYPE_NORMAL',
        center: latlng,
        camera: {
          target: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        },
        zoom: 18
      };
      this.map = GoogleMaps.create('map_canvas', mapOptions);
    });
    await this.addCinemas();
  }

  async localizar() {
    await this.getCoordenadas();
    const options: MarkerOptions = {
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: this.coordenadas.latitude,
        lng: this.coordenadas.longitude
      }
    };

    this.marker = await this.map.addMarker(options);

    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(_ => {
      this.marker.setAnimation('BOUNCE');
    });
  }

  async addCinemas() {

    // Palladium
    let options: MarkerOptions = {
      icon: {
        url: 'assets/img/map_pin_64.png',
        size: {
          width: 64,
          heigth: 64
        }
      },
      animation: 'DROP',
      position: {
        lat: -25.0948427,
        lng: -50.1523016
      }
    };

    this.marker = await this.map.addMarker(options);

    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(_ => {
      this.marker.setAnimation('BOUNCE');
    });

    // Total
    options = {
      icon: {
        url: 'assets/img/map_pin_64.png',
        size: {
          width: 64,
          heigth: 64
        }
      },
      animation: 'DROP',
      position: {
        lat: -25.0850869,
        lng: -50.1792762
      }
    };
    this.marker = await this.map.addMarker(options);

    this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(_ => {
      this.marker.setAnimation('BOUNCE');
    });
  }
}
