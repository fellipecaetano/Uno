package unosample.model.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import unosample.controller.filters.SongSearchFilter;
import unosample.model.entity.Song;
import unosample.utils.StringUtil;

@Transactional
public class SongDao {
    @Autowired
    private SessionFactory sessionFactory;
    
    @SuppressWarnings("unchecked")
    public List<Song> findAll() {
        Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Song.class);
        return criteria.list();
    }

    public Song findById(Long id) {
        return (Song) sessionFactory.getCurrentSession().get(Song.class, id);
    }

    public void delete(Song song) {
        sessionFactory.getCurrentSession().delete(song);
    }

    public void saveOrUpdate(Song song) {
        sessionFactory.getCurrentSession().saveOrUpdate(song);
    }

    @SuppressWarnings("unchecked")
    public List<Song> findWithFilter(SongSearchFilter searchFilter) {
        Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Song.class);
        
        if (searchFilter.getId() != null) {
            criteria.add(Restrictions.eq("id", searchFilter.getId()));
        }
        
        if (!StringUtil.isEmpty(searchFilter.getTitle())) {
            criteria.add(Restrictions.ilike("title", searchFilter.getTitle(), MatchMode.ANYWHERE));
        }
        
        return criteria.list();
    }
}
