use crate::database::DbConn;
use std::sync::Mutex;

pub struct AppState {
    pub(crate) inner: Mutex<AppStateInner>,
}

impl AppState {
    pub fn new(db_handle: DbConn) -> Self {
        Self {
            inner: Mutex::new(AppStateInner { db_handle }),
        }
    }
}

pub struct AppStateInner {
    pub(crate) db_handle: DbConn,
}
