package unosample.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import unosample.controller.filters.SongSearchFilter;
import unosample.model.dao.SongDao;
import unosample.model.entity.Song;

@Transactional
public class SongService {
    @Autowired
    private SongDao songDao;
    
    public List<Song> findAll() {
        return songDao.findAll();
    }

    public Song findById(Long id) {
        return songDao.findById(id);
    }

    public void deleteWithId(Long id) {
        Song song = findById(id);
        songDao.delete(song);
    }

    public void saveOrUpdate(Song song) {
        songDao.saveOrUpdate(song);
    }

    public List<Song> findWithFilter(SongSearchFilter searchFilter) {
        return songDao.findWithFilter(searchFilter);
    }
}
