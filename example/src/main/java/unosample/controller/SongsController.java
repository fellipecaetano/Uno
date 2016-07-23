package unosample.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import unosample.controller.filters.SongSearchFilter;
import unosample.model.entity.Song;
import unosample.model.service.SongService;

@Controller
@RequestMapping("/songs")
public class SongsController {
    @Autowired
    private SongService songService;
    
    @RequestMapping("/index")
    public void findAll(HttpServletResponse resp) throws JSONException, IOException {
        List<Song> songs = songService.findAll();
        JSONObject jsonObject = new JSONObject();
        
        jsonObject.put("songs", songs);
        
        resp.getWriter().print(jsonObject);
    }
    
    @RequestMapping("/show")
    public void findById(@RequestParam Long id, HttpServletResponse resp) throws IOException {
        Song song = songService.findById(id);
        
        if (song == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        } else {
            JSONObject jsonObject = new JSONObject(song);
            resp.getWriter().print(jsonObject);
        }
    }
    
    @RequestMapping("/delete")
    public void delete(@RequestParam String entityData, HttpServletResponse resp) throws IOException {
        try {
            JSONObject jsonObject = new JSONObject(entityData);
            Long id = jsonObject.getLong("id");
            Song song = songService.findById(id);
            
            if (song == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            } else {
                songService.deleteWithId(id);
            }
        } catch (JSONException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }
    
    @RequestMapping("/save")
    public void save(@RequestParam String entityData, HttpServletResponse resp) throws IOException {
        try {
            Song song = new Song(entityData);
            songService.saveOrUpdate(song);
            
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id", song.getId());
            
            resp.getWriter().print(jsonObject);
        } catch (JSONException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);            
        }
    }
    
    @RequestMapping("/search")
    public void search(@RequestParam String filter, HttpServletResponse resp) throws JSONException, IOException {
        List<Song> songs = null;
        JSONObject jsonObject = null;
        
        try {
            SongSearchFilter searchFilter = new SongSearchFilter(filter);
            songs = songService.findWithFilter(searchFilter);
            jsonObject = new JSONObject();
        } catch (JSONException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        
        jsonObject.put("songs", songs);
        resp.getWriter().print(jsonObject);
    }
}
